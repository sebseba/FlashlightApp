package com.ilhan.flashlightapp

import android.content.Context
import android.hardware.camera2.CameraAccessException
import android.hardware.camera2.CameraCharacteristics
import android.hardware.camera2.CameraManager
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class TorchModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val cameraManager: CameraManager =
        reactContext.getSystemService(Context.CAMERA_SERVICE) as CameraManager

    private var torchOn: Boolean = false

    override fun getName(): String = "TorchModule"

    @ReactMethod
    fun toggleTorch() {
        try {
            val cameraId = cameraManager.cameraIdList.firstOrNull { id ->
                val characteristics = cameraManager.getCameraCharacteristics(id)
                val hasFlash = characteristics.get(CameraCharacteristics.FLASH_INFO_AVAILABLE) == true
                val isBackFacing = characteristics.get(CameraCharacteristics.LENS_FACING) == CameraCharacteristics.LENS_FACING_BACK
                hasFlash && isBackFacing
            } ?: return

            torchOn = !torchOn
            cameraManager.setTorchMode(cameraId, torchOn)
            Log.d("TorchModule", "Torch toggled to: $torchOn")

        } catch (e: CameraAccessException) {
            Log.e("TorchModule", "CameraAccessException", e)
        } catch (e: Exception) {
            Log.e("TorchModule", "Exception", e)
        }
    }
}
