requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'], function (extIO, $, Raphael) {

    function drawPath(instructions) {
        // configuration constants
        const cellSize = 20;   // how many pixels represent one unit step
        const margin = 20;     // margin around the drawing

        // starting position
        let currentPos = { x: 0, y: 0 };
        // store each step (including the start)
        let positions = [ { x: 0, y: 0 } ];

        // Process each instruction
        for (let i = 0; i < instructions.length; i++) {
            const step = instructions[i];
            switch (step) {
                case 'f':
                    currentPos = { x: currentPos.x, y: currentPos.y + 1 };
                    break;
                case 'b':
                    currentPos = { x: currentPos.x, y: currentPos.y - 1 };
                    break;
                case 'l':
                    currentPos = { x: currentPos.x - 1, y: currentPos.y };
                    break;
                case 'r':
                    currentPos = { x: currentPos.x + 1, y: currentPos.y };
                    break;
                default:
                    // ignore unknown instructions
                    break;
            }
            positions.push({ x: currentPos.x, y: currentPos.y });
        }

        // Determine bounds so we know how large to make the canvas.
        let xs = positions.map(pos => pos.x).sort((a, b) => a - b);
        let ys = positions.map(pos => pos.y).sort((a, b) => a - b);
        let minX = xs[0];
        let maxX = xs[xs.length - 1];
        let minY = ys[0];
        let maxY = ys[ys.length - 1];

        // Calculate canvas size (in pixels)
        const width = (maxX - minX) * cellSize + margin * 2;
        const height = (maxY - minY) * cellSize + margin * 2;

        // Create Raphael canvas
        const paper = Raphael(document.createElement('div'), width, height);

        // For each position, compute its drawing coordinates.
        // Note: Raphael's coordinate system has (0,0) in the top-left.
        // We want the "logical" y coordinate to increase upward,
        // so we map the logical y to drawnY = height - (margin + (y - minY)*cellSize)
        function getDrawCoords(pos) {
            return {
                x: margin + (pos.x - minX) * cellSize,
                y: height - (margin + (pos.y - minY) * cellSize)
            };
        }

        // Draw path lines
        for (let i = 0; i < positions.length - 1; i++) {
            let start = getDrawCoords(positions[i]);
            let end = getDrawCoords(positions[i + 1]);
            paper.path(`M${start.x},${start.y}L${end.x},${end.y}`)
                .attr({
                    stroke: "#294270",
                    "stroke-width": 2
                });
        }

        // Mark start position (green circle)
        let startDraw = getDrawCoords(positions[0]);
        paper.circle(startDraw.x, startDraw.y, 4)
            .attr({ fill: "#294270", stroke: "#294270", "stroke-width": 1 });

        // Mark final position (red circle)
        let finalDraw = getDrawCoords(positions[positions.length - 1]);
        paper.circle(finalDraw.x, finalDraw.y, 4)
            .attr({ fill: "#FABA00", stroke: "#FABA00", "stroke-width": 1 });

        return paper; // returning paper can be useful for further manipulation if needed.
    }

    // extIO initialization
    new extIO({
        animation: function ($expl, data) {
            // data.in[0] contains the instruction string, e.g., "fflff"
            // Remove whitespace if necessary.
            const instructions = data.in[0].trim();
            // Create a container div inside $expl[0] and append the Raphael canvas into it.
            const container = document.createElement("div");
            $expl[0].appendChild(container);
            // Draw the path on the container.
            const paper = drawPath(instructions);
            // Append the paper's canvas (Raphael creates its own element) to our container.
            container.appendChild(paper.canvas);
        }
    }).start();
});
