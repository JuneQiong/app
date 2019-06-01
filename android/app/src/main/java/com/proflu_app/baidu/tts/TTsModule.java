package com.proflu_app.baidu.tts;

import com.baidu.tts.client.SpeechSynthesizer;
import com.baidu.tts.client.TtsMode;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class TTsModule extends ReactContextBaseJavaModule {
    // 只创建一个实例
    private SpeechSynthesizer mSpeechSynthesizer = SpeechSynthesizer.getInstance();
    public TTsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        String AppId = "15717783";
        String AppKey = "Zud2776NlXhcUNTgcMiGQdXC";
        String AppSecret = "kOtiGfUeI6MKsDejj3xvSIgvqHSHf0gH";
        mSpeechSynthesizer.setContext(reactContext);
        mSpeechSynthesizer.setAppId(AppId);
        mSpeechSynthesizer.setApiKey(AppKey, AppSecret);
        // 不使用离线语音包的模式
        mSpeechSynthesizer.auth(TtsMode.ONLINE);


    }

    @ReactMethod
    public void speech(String text,String speaker, Promise promise) {
        mSpeechSynthesizer.setParam(SpeechSynthesizer.PARAM_SPEAKER, "0");
        mSpeechSynthesizer.setSpeechSynthesizerListener(new TTsEventListener(promise));
        mSpeechSynthesizer.initTts(TtsMode.MIX);
        mSpeechSynthesizer.speak(text);
    }

    @ReactMethod
    public void pause(Promise promise) {
        promise.resolve(true);
        mSpeechSynthesizer.pause();
    }

    @ReactMethod
    public void resume(Promise promise){
        promise.resolve(true);
        mSpeechSynthesizer.resume();
    }

    @ReactMethod
    public void stop(Promise promise) {
        promise.resolve(true);
        mSpeechSynthesizer.stop();
    }

    @ReactMethod
    public void release(Promise promise) {
        promise.resolve(true);
        mSpeechSynthesizer.release();
    }

    @Override
    public String getName() {
        return "TTsModule";
    }
}
