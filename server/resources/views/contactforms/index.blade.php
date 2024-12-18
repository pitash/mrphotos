@extends('layouts.app')

@section('content')
{{-- <div class="d-flex justify-content-between align-items-center mt-4 mb-4">
    <h2 class="fw-bold text-primary mb-0">
        <i class="fas fa-sliders me-2"></i> Slider List
    </h2>
    <div>
        <button type="button" class="btn btn-gradient-primary shadow-sm d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#createModal" style="background: linear-gradient(135deg, #4e73df, #224abe); border: none;">
            <i class="fas fa-plus-circle me-2"></i> Create Slider
        </button>
    </div>
</div> --}}

<ol class="breadcrumb bg-light p-3 rounded shadow-sm">
    <li class="breadcrumb-item">
        <a href="#" class="text-decoration-none text-primary">
            <i class="fas fa-tachometer-alt me-1"></i> Dashboard
        </a>
    </li>
    <li class="breadcrumb-item active text-muted">
        <i class="fas fa fa-check-square me-1"></i> Contact Form Submissions
    </li>
</ol>
<div class="card mb-4">
    <div class="card-header">
        <i class="fas fa-table me-1"></i>
        Contact Form Submissions
    </div>
    <div class="card-body">
        <table id="datatablesSimple">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Created At</th>
                </tr>
            </tfoot>
            <tbody>
                @foreach($contactForms as $contactForm)
                <tr>
                    <td>{{ $contactForm->name }}</td>
                    <td>{{ $contactForm->email }}</td>
                    <td>{{ $contactForm->subject }}</td>
                    <td>{{ $contactForm->message }}</td>
                    <td>{{ $contactForm->created_at->format('Y-m-d H:i:s') }}</td>
                    {{-- <td>{{ \Carbon\Carbon::parse($contactForm->created_at)->timezone('Asia/Dhaka')->format('Y-m-d H:i:s') }}</td> --}}

                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>

<!-- Edit Modal -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Edit Slider</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Edit Form -->
                <form id="editForm" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PATCH')

                    <div class="mb-3">
                        <label for="edit_tag" class="form-label">Tag</label>
                        <input type="text" class="form-control" id="edit_tag" name="tag" required>
                    </div>

                    <div class="mb-3">
                        <label for="edit_heading" class="form-label">Heading</label>
                        <input type="text" class="form-control" id="edit_heading" name="heading" required>
                    </div>

                    <div class="mb-3">
                        <label for="edit_image" class="form-label">Image</label>
                        <input type="file" class="form-control" id="edit_image" name="image" accept="image/*">
                        <div id="main-image-preview" class="mt-2"></div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection

