package com.proflu_app.baidu.tts;

import com.baidu.tts.client.SpeechError;
import com.baidu.tts.client.SpeechSynthesizerListener;
import com.facebook.react.bridge.Promise;

public class TTsEventListener implements SpeechSynthesizerListener {
    private Promise pr;
    public TTsEventListener(Promise promise) {
        pr = promise;
    }
    @Override
    public void onSpeechStart(String s) {
//        pr.resolve(s);
    }

    @Override
    public void onError(String s, SpeechError speechError) {
        pr.reject("E__TTS_ERROR", s);
    }

    @Override
    public void onSpeechFinish(String s) {
        pr.resolve("finish:" +  s);
    }

    @Override
    public void onSpeechProgressChanged(String s, int i) {

    }

    @Override
    public void onSynthesizeDataArrived(String s, byte[] bytes, int i) {

    }

    @Override
    public void onSynthesizeFinish(String s) {

    }

    @Override
    public void onSynthesizeStart(String s) {

    }
}
