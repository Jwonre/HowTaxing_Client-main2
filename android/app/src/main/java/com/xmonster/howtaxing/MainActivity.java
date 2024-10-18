package com.xmonster.howtaxingapp;

import android.os.Bundle;
import android.content.Context;
import android.content.res.Configuration;
import android.util.DisplayMetrics;
import android.view.WindowManager;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "howtaxing";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    adjustFontScale(getResources().getConfiguration());
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

  @Override
  protected void attachBaseContext(Context newBase) {
    Configuration overrideConfiguration = new Configuration(newBase.getResources().getConfiguration());
    overrideConfiguration.fontScale = 1.0f; // 폰트 크기 고정
    Context context = newBase.createConfigurationContext(overrideConfiguration);
    super.attachBaseContext(context);
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    adjustFontScale(newConfig);
  }

  private void adjustFontScale(Configuration configuration) {
    configuration.fontScale = (float) 1.0;
    DisplayMetrics metrics = getResources().getDisplayMetrics();
    WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);
    wm.getDefaultDisplay().getMetrics(metrics);
    metrics.scaledDensity = configuration.fontScale * metrics.density;
    getBaseContext().getResources().updateConfiguration(configuration, metrics);

    // lineHeight 설정

  }
}