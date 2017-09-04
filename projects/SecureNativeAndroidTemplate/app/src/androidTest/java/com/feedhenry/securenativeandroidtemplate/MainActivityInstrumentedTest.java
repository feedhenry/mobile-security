package com.feedhenry.securenativeandroidtemplate;

import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.action.ViewActions.click;
import static android.support.test.espresso.assertion.ViewAssertions.matches;
import static android.support.test.espresso.contrib.DrawerActions.open;
import static android.support.test.espresso.contrib.DrawerMatchers.isClosed;
import static android.support.test.espresso.matcher.ViewMatchers.isDisplayed;
import static android.support.test.espresso.matcher.ViewMatchers.withId;
import static android.support.test.espresso.matcher.ViewMatchers.withText;

/**
 * Instrumentation test, which will execute on an Android device.
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
@RunWith(AndroidJUnit4.class)
public class MainActivityInstrumentedTest {

    @Rule
    public ActivityTestRule activityRule = new ActivityTestRule(MainActivity.class);

    @Test
    public void homeViewDisplayed() throws Exception {
        onView(withId(R.id.home_title)).check(matches(isDisplayed()));
        onView(withId(R.id.drawer_layout)).check(matches(isClosed()));
    }


    @Test
    public void appNavigation() throws Exception {
        onView(withId(R.id.drawer_layout)).perform(open());
        navigateTo(R.string.fragment_title_authenticate, R.id.login_form);
    }

    private void navigateTo(final int titleId, final int framgmentId) throws Exception {
        onView(withText(titleId)).perform(click());
        onView(withId(framgmentId)).check(matches(isDisplayed()));
    }
}
