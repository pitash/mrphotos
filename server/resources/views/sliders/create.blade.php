@extends('layouts.app')

@section('content')
<div class="container">&nbsp;
    <h1>Create New Slider</h1>
    <form action="{{ route('sliders.store') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="mb-3">
            <label for="tag" class="form-label">Tag</label>
            <input type="text" class="form-control" id="tag" name="tag" required>
        </div>

        <div class="mb-3">
            <label for="heading" class="form-label">Heading</label>
            <input type="text" class="form-control" id="heading" name="heading" required>
        </div>

        <div class="mb-3">
            <label for="image" class="form-label">Image</label>
            <input type="file" class="form-control" id="image" name="image" required accept="image/*">
        </div>

        <button type="submit" class="btn btn-success">Create Slider</button>
        <a href="{{ route('sliders.index') }}" class="btn btn-secondary">Back to List</a>
    </form>
</div>
@endsection

