import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

class Cube extends Shape {
    constructor() {
        super("position", "normal",);
        // Loop 3 times (for each axis), and inside loop twice (for opposing cube sides):
        this.arrays.position = Vector3.cast(
            [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
            [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [-1, 1, -1]);
        this.arrays.normal = Vector3.cast(
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
        // Arrange the vertices into a square shape in texture space too:
        this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
            14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
    }
}

class Cube_Outline extends Shape {
    constructor() {
        super("position", "color");
        //  TODO (Requirement 5).
        // When a set of lines is used in graphics, you should think of the list entries as
        // broken down into pairs; each pair of vertices will be drawn as a line segment.
        // Note: since the outline is rendered with Basic_shader, you need to redefine the position and color of each vertex
        this.arrays.position = Vector3.cast(
           [-1,-1,-1], [-1,1,-1], [-1,-1,-1], [1,-1,-1], [-1,-1,-1],  [-1,-1,1],  [1,1,1],  [-1,1,1],
           [1,1,1], [1,1,-1], [1,1,1], [1,-1,1], [1,1,-1],  [1,-1,-1],  [-1,1,-1],  [1,1,-1],
           [-1,-1,1],  [1,-1,1],  [-1,1,1],  [-1,1,-1], [-1,-1,1], [-1,1,1], [1,-1,-1], [1,-1,1]);
        
        this.arrays.color.push(
            [1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],
            [1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],
            [1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],
            [1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]);

        this.indices = false;
    }
}

class Base_Scene extends Scene {
    /**
     *  **Base_scene** is a Scene that can be added to any display canvas.
     *  Setup the shapes, materials, camera, and lighting here.
     */
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();
        this.hover = this.swarm = false;
        this.outline = false;
        this.colorArr=[];
        for (let i = 0; i < 8 ; i++)
        {
            this.colorArr[i] = color(Math.random(),Math.random(),Math.random(),1);
        }
        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            'cube': new Cube(),
            'outline': new Cube_Outline(),
            'sphere': new defs.Subdivision_Sphere(4),
            'cone': new defs.Closed_Cone(3,4),
        };

        // *** Materials
        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#ffffff")}),
        };
        // The white material and basic shader are used for drawing the outline.
        this.white = new Material(new defs.Basic_Shader());
    }

    display(context, program_state) {
        // display():  Called once per frame of animation. Here, the base class's display only does
        // some initial setup.

        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(Mat4.translation(0, -10, -47));
        }
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 200);

        // *** Lights: *** Values of vector or point lights.
        const light_position1 = vec4(0, 20, 5, 1);
        program_state.lights = [new Light(light_position1, color(1, 1, 1, 1), 1000)];
    }
}

export class Assignment2 extends Base_Scene {
    /**
     * This Scene object can be added to any display canvas.
     * We isolate that code so it can be experimented with on its own.
     * This gives you a very small code sandbox for editing a simple scene, and for
     * experimenting with matrix transformations.
     */
    set_colors() {
        // TODO:  Create a class member variable to store your cube's colors.
        // Hint:  You might need to create a member variable at somewhere to store the colors, using `this`.
        // Hint2: You can consider add a constructor for class Assignment2, or add member variables in Base_Scene's constructor.
        for (let i = 0; i < 8 ; i++)
        {
            this.colorArr[i] = color(Math.random(),Math.random(),Math.random(),1);
        }
    }

    make_control_panel() {
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        this.key_triggered_button("Change Colors", ["c"], this.set_colors);
        // Add a button for controlling the scene.
        this.key_triggered_button("Outline", ["o"], () => {
            // TODO:  Requirement 5b:  Set a flag here that will toggle your outline on and off
            this.outline = !this.outline;
        });
        this.key_triggered_button("Sit still", ["m"], () => {
            // TODO:  Requirement 3d:  Set a flag here that will toggle your swaying motion on and off.
            this.hover = !this.hover;
        });
    }

    draw_box(context, program_state, model_transform, color1) {
        // TODO:  Helper function for requirement 3 (see hint).
        //        This should make changes to the model_transform matrix, draw the next box, and return the newest model_transform.
        // Hint:  You can add more parameters for this function, like the desired color, index of the box, etc.

        const t = this.t = program_state.animation_time / 1000

        if(this.outline)
        {
           this.shapes.outline.draw(context, program_state, model_transform, this.white, "LINES");
        }
        else
        {
            this.shapes.cube.draw(context, program_state, model_transform, this.materials.plastic.override({color:color1}));
        }
        //model_transform = model_transform.times(Mat4.translation(0, 2, 0));
        var r = 0;

        model_transform   = model_transform.times( Mat4.translation( -1, 1, 0) )
                                             .times( Mat4.rotation( r,0, 0, 1 ) ) 
                                             .times( Mat4.translation(1, 1, 0) );
        
        return model_transform;
    }

    draw_room(context, program_state, model_transform) {
        // TODO:  Helper function for requirement 3 (see hint).
        //        This should make changes to the model_transform matrix, draw the next box, and return the newest model_transform.
        // Hint:  You can add more parameters for this function, like the desired color, index of the box, etc.

        const t = this.t = program_state.animation_time / 1000

        let col1 = hex_color("#ff0000");
        let col2 = hex_color("#ffffff");
        let col3 = hex_color("#ffd700");
        let col4 = hex_color("#ffff00");
        
        //Walls and floor
        
        model_transform = model_transform.times(Mat4.scale(50,1,50));

        model_transform = this.draw_box(context, program_state, model_transform, col2);

        let model_transform2 = Mat4.identity();

        model_transform2 = model_transform2.times(Mat4.translation(50,25,0))
                                        .times(Mat4.scale(1,25,50));

        model_transform2 = this.draw_box(context, program_state, model_transform2, col2);

        let model_transform3 = Mat4.identity();

        model_transform3 = model_transform3.times(Mat4.translation(-50,25,0))
                                        .times(Mat4.scale(1,25,50));

        model_transform3 = this.draw_box(context, program_state, model_transform3, col2);

        let model_transform4 = Mat4.identity();

        model_transform4 = model_transform4.times(Mat4.translation(0,25,-50))
                                        .times(Mat4.scale(50,25,1));

        model_transform4 = this.draw_box(context, program_state, model_transform4, col2);

        let model_transform5 = Mat4.identity();

        model_transform5 = model_transform5.times(Mat4.translation(0,25,50))
                                        .times(Mat4.scale(50,25,1));

        model_transform5 = this.draw_box(context, program_state, model_transform5, col2);


        //Pedestal and treasure
        let pedestal = Mat4.identity();

        pedestal = pedestal.times(Mat4.translation(0,5,-45))
                                        .times(Mat4.scale(1,5,1));

        pedestal = this.draw_box(context, program_state, pedestal, col1);

        let treasure = pedestal.times(Mat4.scale(0.75,0.3,0.75))
                            .times(Mat4.translation(0,-2.3,0));

        treasure = this.shapes.sphere.draw(context, program_state, treasure, this.materials.plastic.override({color:col3}));
        

        //Guards
        let guard_1 = Mat4.identity();

        guard_1 = guard_1.times(Mat4.translation(45,5,0))
                        .times(Mat4.translation(0,0,-20*(Math.sin(Math.PI*t/3) + (1/3)*Math.sin(3*Math.PI*t/3) + (1/5)*Math.sin(5*Math.PI*t/3) + (1/7)*Math.sin(7*Math.PI*t/3))))
                        .times(Mat4.translation(-45 + -20*(Math.cos(Math.PI*t/3) + (1/3)*Math.cos(3*Math.PI*t/3) + (1/5)*Math.cos(5*Math.PI*t/3) + (1/7)*Math.cos(7*Math.PI*t/3)),0,0))
                        .times(Mat4.scale(1,3,3));

        guard_1 = this.draw_box(context, program_state, guard_1, col1);

        let guard_head = guard_1.times(Mat4.translation(0,-0.1,0))
                           .times(Mat4.scale(2.25,0.9,0.75));

        guard_head = this.shapes.sphere.draw(context, program_state, guard_head, this.materials.plastic.override({color:col1}));

        let guard_light = guard_1.times(Mat4.rotation(-Math.PI/2,0,1,0))
                         .times(Mat4.translation(1,-2,-11))
                         .times(Mat4.scale(1,1,12));

        if (Math.sin(Math.PI*t/3) < 0)
        {
            guard_light = guard_1.times(Mat4.rotation(Math.PI/2,0,1,0))
                         .times(Mat4.translation(1,-2,-11))
                         .times(Mat4.scale(1,1,12));
        }

        guard_light = this.shapes.cone.draw(context, program_state, guard_light, this.materials.plastic.override({color:col4}));

        let guard_2 = Mat4.identity();

        guard_2 = guard_2.times(Mat4.translation(-45,5,0))
                        .times(Mat4.translation(0,0,20*(Math.sin(Math.PI*t/3) + (1/3)*Math.sin(3*Math.PI*t/3) + (1/5)*Math.sin(5*Math.PI*t/3) + (1/7)*Math.sin(7*Math.PI*t/3))))
                        .times(Mat4.translation(45 + 20*(Math.cos(Math.PI*t/3) + (1/3)*Math.cos(3*Math.PI*t/3) + (1/5)*Math.cos(5*Math.PI*t/3) + (1/7)*Math.cos(7*Math.PI*t/3)),0,0))
                        .times(Mat4.scale(1,3,3));

        guard_2 = this.draw_box(context, program_state, guard_2, col1);

        let guard_head2 = guard_2.times(Mat4.translation(0,-0.1,0))
                           .times(Mat4.scale(2.25,0.9,0.75));

        guard_head2 = this.shapes.sphere.draw(context, program_state, guard_head2, this.materials.plastic.override({color:col1}));

        let guard_light2 = guard_2.times(Mat4.rotation(-Math.PI/2,0,1,0))
                         .times(Mat4.translation(1,-2,-11))
                         .times(Mat4.scale(1,1,12));

        if (Math.sin(Math.PI*t/3) > 0)
        {
            guard_light2 = guard_2.times(Mat4.rotation(Math.PI/2,0,1,0))
                         .times(Mat4.translation(1,-2,-11))
                         .times(Mat4.scale(1,1,12));
        }

        guard_light2 = this.shapes.cone.draw(context, program_state, guard_light2, this.materials.plastic.override({color:col4}));


        return model_transform;
    }

    display(context, program_state) {
        super.display(context, program_state);
        const blue = hex_color("#1a9ffa");
        let model_transform = Mat4.identity();

        model_transform = this.draw_room(context, program_state, model_transform);
    }
}