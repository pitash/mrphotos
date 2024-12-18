@extends('layouts.app')

@section('content')
<div class="d-flex justify-content-between align-items-center mt-4 mb-4">
    <h2 class="fw-bold text-primary mb-0">
        <i class="fas fa-sliders me-2"></i> Slider List
    </h2>
    <div>
        <button type="button" class="btn btn-gradient-primary shadow-sm d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#createModal" style="background: linear-gradient(135deg, #4e73df, #224abe); border: none;">
            <i class="fas fa-plus-circle me-2"></i> Create Slider
        </button>
    </div>
</div>

<ol class="breadcrumb bg-light p-3 rounded shadow-sm">
    <li class="breadcrumb-item">
        <a href="#" class="text-decoration-none text-primary">
            <i class="fas fa-tachometer-alt me-1"></i> Dashboard
        </a>
    </li>
    <li class="breadcrumb-item active text-muted">
        <i class="fas fa-sliders me-1"></i> Slider
    </li>
</ol>
<div class="card mb-4">
    <div class="card-header">
        <i class="fas fa-table me-1"></i>
        Slider List
    </div>
    <div class="card-body">
        <table id="datatablesSimple">
            <thead>
                <tr>
                    <th>Tag</th>
                    <th>Heading</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Tag</th>
                    <th>Heading</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </tfoot>
            <tbody>
                @foreach ($sliders as $slider)
                <tr>
                    <td>{{ $slider->tag }}</td>
                    <td>{{ $slider->heading }}</td>
                    <td>
                        @if ($slider->image_path)
                            <img src="{{ asset('storage/' . $slider->image_path) }}" alt="Slider Image" height="120" width="220">
                        @else
                            No Image
                        @endif
                    </td>
                    <td>
                        <form action="{{ route('sliders.toggleStatus', $slider->id) }}" method="POST" style="display: inline;">
                            @csrf
                            @method('PATCH')

                            @if ($slider->is_active)
                                <button type="submit" class="btn btn-danger btn-sm">Deactivate</button>
                            @else
                                <button type="submit" class="btn btn-success btn-sm">Activate</button>
                            @endif
                        </form>

                        <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editData({{ $slider->id }})">
                            Edit
                        </button>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>

<!-- Create Modal -->
<div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createModalLabel">Create New Slider</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
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

                    <!-- Display selected images -->
                    <div id="image-preview" class="mt-3"></div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">Create</button>
                    </div>
                </form>
            </div>
        </div>
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

<script>
    document.getElementById("image").addEventListener("change", function(event) {
        const files = event.target.files;
        const previewContainer = document.getElementById("image-preview");
        previewContainer.innerHTML = ""; // Clear previous previews

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.createElement("img");
                imgElement.src = e.target.result;
                imgElement.classList.add("img-thumbnail", "me-2");
                imgElement.style.maxWidth = "100px";
                imgElement.style.maxHeight = "100px";
                previewContainer.appendChild(imgElement);
            };
            reader.readAsDataURL(file);
        });
    });

    function editData(dataId) {
        fetch(`/sliders/${dataId}/edit`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('edit_tag').value = data.tag;
                document.getElementById('edit_heading').value = data.heading;
                document.getElementById('edit_image').value = '';

                const mainImageContainer = document.getElementById('main-image-preview');
                mainImageContainer.innerHTML = "";
                if (data.main_image) {
                    const mainImg = document.createElement("img");
                    mainImg.src = data.main_image; // Use the full URL returned by the controller
                    mainImg.classList.add("img-thumbnail");
                    mainImg.style.maxWidth = "100px";
                    mainImg.style.maxHeight = "100px";
                    mainImageContainer.appendChild(mainImg);
                }

                document.getElementById('editForm').action = `/sliders/${dataId}`;
            })
            .catch(error => console.error('Error:', error));
    }


    document.getElementById('edit_image').addEventListener('change', function(event) {
        const mainImageContainer = document.getElementById('main-image-preview');
        mainImageContainer.innerHTML = "";

        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const mainImg = document.createElement("img");
                mainImg.src = e.target.result;
                mainImg.classList.add("img-thumbnail");
                mainImg.style.maxWidth = "100px";
                mainImg.style.maxHeight = "100px";
                mainImageContainer.appendChild(mainImg);
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    });


</script>

@endsection

