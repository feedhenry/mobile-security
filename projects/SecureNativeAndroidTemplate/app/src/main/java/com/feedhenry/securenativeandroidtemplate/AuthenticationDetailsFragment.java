package com.feedhenry.securenativeandroidtemplate;


import android.os.Bundle;
import android.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


/**
 * A fragment for showing the user details view after they have logged in.
 */
public class AuthenticationDetailsFragment extends Fragment {

    View view;

    public AuthenticationDetailsFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.fragment_authentication_details, container, false);

        return view;
    }

}
