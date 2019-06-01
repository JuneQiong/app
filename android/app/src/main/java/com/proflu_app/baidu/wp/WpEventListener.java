package com.proflu_app.baidu.wp;

import com.baidu.speech.EventListener;
import com.baidu.speech.asr.SpeechConstant;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nullable;

public class WpEventListener implements EventListener {
    private ReactContext react;
    public WpEventListener(ReactContext reactContext) {
        react = reactContext;
    }
    @Override
    public void onEvent(String name, String params, byte[] bytes, int offset, int length) {
        WritableMap map = Arguments.createMap();
        // 唤醒准备好了
        if (name.equals(SpeechConstant.CALLBACK_EVENT_WAKEUP_READY)) {
            map.putBoolean("ready", true);
            map.putString("params", params);
        }
        // 唤醒已经开始
        if(name.equals(SpeechConstant.CALLBACK_EVENT_WAKEUP_STARTED)) {
            map.putBoolean("started", true);
            map.putString("params", params);
        }
        // 唤醒成功
        if (name.equals(SpeechConstant.CALLBACK_EVENT_WAKEUP_SUCCESS)) {
            map.putBoolean("success", true);
            map.putString("params", params);
        }
        // 唤醒异常
        if (name.equals(SpeechConstant.CALLBACK_EVENT_WAKEUP_ERROR)) {
            map.putBoolean("error", true);
            map.putString("params", params);
        }
        sendEvent("baidu.wp.event", map);
    }

    public void sendEvent(String eventName,@Nullable WritableMap parmas) {
        react.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, parmas);
    }


}