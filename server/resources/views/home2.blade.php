@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>
                <div class="card-body">
                    <div class="row">
                        <!-- Left Panel -->
                        <div class="col-md-3">
                            <div class="p-3 bg-light ">
                                <h5>Navigation</h5>
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <a href="#homepage" class="nav-link">Homepage1</a>
                                    </li>
                                    {{-- <li class="nav-item">
                                        <a href="#gallery" class="nav-link">Gallery</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#ui" class="nav-link">UI</a>
                                    </li> --}}
                                </ul>
                            </div>
                        </div>

                        <!-- Right Panel -->
                        <div class="col-md-9">
                            <div class="p-3 bg-light border rounded">
                                <h5 id="homepage">Homepage</h5>
                                <p>This is the homepage content. You can manage the primary dashboard settings here.</p>

                                <h5 id="gallery" class="mt-5">Gallery</h5>
                                <p>This is the gallery section where you can upload and manage images.</p>

                                <h5 id="ui" class="mt-5">UI</h5>
                                <p>This section allows you to customize the user interface elements of the admin panel.</p>
                            </div>
                        </div>
                    </div> <!-- End Row -->
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
