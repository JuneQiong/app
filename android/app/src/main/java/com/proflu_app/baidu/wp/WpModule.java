package com.proflu_app.baidu.wp;

import android.Manifest;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;

import com.baidu.speech.EventListener;
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

public class WpModule extends ReactContextBaseJavaModule {
    private ReactContext react;
    private EventManager wp;
    private EventListener el;
    public WpModule(ReactApplicationContext reactContext) {
        super(reactContext);
        // 创建一个asr 事件管理器
        react = reactContext;
        wp = EventManagerFactory.create(reactContext, "wp");
    }


    @ReactMethod
    public void start(Promise promise) {
        // 防止重复启动唤醒
        if(el != null) return;
        if (!initPermission()) {
            promise.reject("E_PERMISSION_ERROR", "没有录音权限");
            return;
        }
        Map<String, Object> params = new LinkedHashMap<>();
        params.put(SpeechConstant.WP_WORDS_FILE, "assets://WakeUp.bin");
        el = new WpEventListener(react);
        wp.registerListener(el);
        wp.send(SpeechConstant.WAKEUP_START, new JSONObject(params).toString(), null, 0,0);
        promise.resolve(true);
    }

    @ReactMethod
    public void close(Promise promise) {
        if (!initPermission()) {
            promise.reject("E_PERMISSION_ERROR", "没有录音权限");
            return;
        }
        wp.unregisterListener(el);
        el = null;
        wp.send(SpeechConstant.WAKEUP_STOP,null, null, 0, 0);
        promise.resolve(true);
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

    @Override
    public String getName() {
        return "WpModule";
    }
}
