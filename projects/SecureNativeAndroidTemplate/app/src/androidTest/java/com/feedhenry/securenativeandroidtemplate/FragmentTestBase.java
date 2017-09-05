package com.feedhenry.securenativeandroidtemplate;

import android.app.Fragment;
import android.support.test.rule.ActivityTestRule;

import org.junit.Rule;

/**
 * Created by weili on 04/09/2017.
 */

class FragmentTestBase {
    @Rule
    public ActivityTestRule activityRule = new ActivityTestRule(MainActivity.class);

    public void loadFragment(Fragment fragmentUnderTest) {
        ((MainActivity) activityRule.getActivity()).loadFragment(fragmentUnderTest);
    }
}
