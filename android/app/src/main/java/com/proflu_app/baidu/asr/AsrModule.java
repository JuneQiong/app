package com.proflu_app.baidu.asr;

import android.Manifest;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import com.baidu.speech.EventManager;
import com.baidu.speech.EventManagerFactory;
import com.baidu.speech.asr.SpeechConstant;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

public class AsrModule extends ReactContextBaseJavaModule {
    public EventManager asr;
    public AsrEventListener event;
    private ReactContext react;
    public AsrModule(ReactApplicationContext reactContext) {
        super(reactContext);
        // 创建一个asr 事件管理器
        react = reactContext;
        asr = EventManagerFactory.create(reactContext, "asr");
    }

    /**
     * android 6.0 以上需要动态申请权限
     */
    private boolean initPermission() {
        String permissions[] = {
                Manifest.permission.RECORD_AUDIO,
                Manifest.permission.ACCESS_NETWORK_STATE,
                Manifest.permission.INTERNET,
                Manifest.permission.READ_PHONE_STATE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
        };

        ArrayList<String> toApplyList = new ArrayList<String>();

        for (String perm : permissions) {
            if (PackageManager.PERMISSION_GRANTED != ContextCompat.checkSelfPermission(react, perm)) {
                toApplyList.add(perm);
                // 进入到这里代表没有权限.
                return false;
            }
        }
        String tmpList[] = new String[toApplyList.size()];
        if (!toApplyList.isEmpty()) {
            ActivityCompat.requestPermissions(react.getCurrentActivity(), toApplyList.toArray(tmpList), 123);
        }
        return true;
    }

    @ReactMethod
    public void start(Promise promise) {
        // 防止重复识别
        if (event != null) return;
        if (!initPermission()) {
            promise.reject("E_PERMISSION_ERROR", "没有录音权限");
            return;
        };
        event = new AsrEventListener(react);
        asr.registerListener(event);
        Map<String, Object> params = new LinkedHashMap<>();
        params.put(SpeechConstant.PID, 1536);
        params.put(SpeechConstant.DECODER, 0);
        params.put(SpeechConstant.ACCEPT_AUDIO_DATA, false);
        params.put(SpeechConstant.ACCEPT_AUDIO_VOLUME, true);
        asr.send(SpeechConstant.ASR_START, new JSONObject(params).toString(), null, 0, 0);
        promise.resolve("asr ready");
    }

    @ReactMethod
    public void stop(Promise promise) {
        if (event != null) {
            asr.unregisterListener(event);
        }
        // 清除事件
        event = null;
        asr.send(SpeechConstant.ASR_STOP, null, null, 0,0);
    }

    @ReactMethod
    public void cancel(Promise promise) {
        if (event != null) {
            asr.unregisterListener(event);
        }
        // 清除事件
        event = null;
        asr.send(SpeechConstant.ASR_CANCEL, null, null, 0, 0);
    }

    @Override
    public String getName() {
        return "AsrModule";
    }
}
