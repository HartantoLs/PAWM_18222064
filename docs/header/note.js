const canvas = document.getElementById('drawingCanvas');
        const ctx = canvas.getContext('2d');
        let painting = false;

        // Adjust canvas size to the container
        function adjustCanvasSize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        adjustCanvasSize();

        // Start drawing
        function startDrawing(e) {
            painting = true;
            draw(e);
        }

        // End drawing
        function endDrawing() {
            painting = false;
            ctx.beginPath();
        }

        // Draw function
        function draw(e) {
            if (!painting) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'black';

            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        // Add event listeners for drawing
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mousemove', draw);

        // Handle drag events for trash and save buttons
        document.getElementById('trashButton').addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('action', 'reset');
        });
        document.getElementById('saveButton').addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('action', 'save');
        });

        // Handle drop events on the canvas
        canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            const action = e.dataTransfer.getData('action');

            if (action === 'reset') {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            } else if (action === 'save') {
                const link = document.createElement('a');
                link.download = 'drawing.png';
                link.href = canvas.toDataURL();
                link.click();
                alert('Canvas has been saved!');
            }
        });