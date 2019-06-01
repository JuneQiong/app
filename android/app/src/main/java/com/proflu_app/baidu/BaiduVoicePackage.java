package com.proflu_app.baidu;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.proflu_app.baidu.asr.AsrModule;
import com.proflu_app.baidu.tts.TTsModule;
import com.proflu_app.baidu.wp.WpModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BaiduVoicePackage implements ReactPackage {
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> list = new ArrayList<>();
        list.add(new AsrModule(reactContext));
        list.add(new WpModule(reactContext));
        list.add(new TTsModule(reactContext));
        return list;
    }
}
