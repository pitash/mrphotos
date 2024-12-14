@extends('layouts.app')

@section('content')
<div class="container">&nbsp;
    <h1>Create New Gallery</h1>
    <form action="{{ route('gallery.store') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" name="title" required>
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" class="form-control" id="description" name="description" required>
        </div>

        <div class="mb-3">
            <label for="country_id" class="form-label">Country</label>
            <select class="form-select" id="country_id" name="country_id" required>
                <option value="">Select a Country</option>
                @foreach ($countries as $country)
                    <option value="{{ $country->id }}">{{ $country->name }}</option>
                @endforeach
            </select>
        </div>

        <div class="mb-3">
            <label for="image" class="form-label">Image</label>
            <input type="file" class="form-control" id="image" name="image" required accept="image/*">
        </div>

        <button type="submit" class="btn btn-success">Create Gallery</button>
        <a href="{{ route('gallery.index') }}" class="btn btn-secondary">Back to List</a>
    </form>
</div>
@endsection

