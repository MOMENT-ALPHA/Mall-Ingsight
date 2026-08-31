<?php

use Illuminate\Support\Facades\Route;

// Vue Router (history mode) owns client-side routing; every path renders the
// same SPA shell so the frontend can resolve the actual screen.
Route::view('/{any?}', 'app')->where('any', '.*');
