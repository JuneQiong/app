package com.proflu_app.baidu.asr;

import com.baidu.speech.EventListener;
import com.baidu.speech.asr.SpeechConstant;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nullable;

public class AsrEventListener implements EventListener {
    private ReactContext react;
    public AsrEventListener(ReactContext reactContext) {
        react = reactContext;
    }
    @Override
    public void onEvent(String name, String params, byte[] bytes, int offset, int length) {
        WritableMap map = Arguments.createMap();
        // 接收语音识别的数据回调的
        if (name.equals(SpeechConstant.CALLBACK_EVENT_ASR_READY)) {
            map.putBoolean("ready", true);
            map.putString("params", params);
            // ASR 已经准备好了
        } else if (name.equals(SpeechConstant.CALLBACK_EVENT_ASR_PARTIAL)) {
            map.putBoolean("ready", true);
            map.putString("params", params);
        } else if (name.equals(SpeechConstant.CALLBACK_EVENT_ASR_FINISH)) {
            // 完成
            map.putBoolean("start", false);
            map.putBoolean("finish", true);
            map.putString("params", params);
        } else if (name.equals(SpeechConstant.CALLBACK_EVENT_ASR_ERROR)) {
            // 语音识别异常
            map.putBoolean("start", false);
            map.putBoolean("finish", false);
            map.putBoolean("error", true);
            map.putString("params", params);
        }
        sendEvent("baidu.asr.event", map);
    }

    public void sendEvent(String eventName,@Nullable WritableMap parmas) {
        react.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, parmas);
    }


}
