//Declaration of all the main techniques to be used as globals
var possibleFingerings = ["im", "mi", "ia", "ai", "ma", "am"];
var selectedFingerings = [];
var fingering;
var selectedFingeringStr;

var possibleStrokes = ["Apoyando", "Tirando"];
var selectedStrokes = [];
var strokes;
var selectedStrokesStr;

var possibleDynamics = ["Piano", "Forte", "Crescendo", "Diminuendo"];
var selectedDynamics = [];
var dynamics;
var selectedDynamicsStr;

var possibleTechniques = ["Tasto", "Ponticello"];
var selectedTechniques = [];
var techniques;
var selectedTechniquesStr;

var possibleExecution = ["Crotchets", "Repeated Quavers"];
var selectedExecution = [];
var execution;
var selectedExecutionStr;

//declaration of other required globals such as buttons and sliders
var button;
var inp;
var randomisedTechniques = ["", "", "", "", ""];
var submitButton;
var technique;
var tech;
var drawText;

function setup() {
	createCanvas(450, 450);
	//creates a selection box for each of the techniques above
	fingering = createSelect(true);
	strokes = createSelect(true);
	dynamics = createSelect(true);
	techniques = createSelect(true);
	execution = createSelect(true);
	button = createButton("Randomize");
	button.position(185, 250);
	button.mousePressed(randomize);

	//see updateLists func
	updateLists();

	//declares a callback func for each of the selection boxes
	fingering.changed(fingeringChanged);
	strokes.changed(strokeChanged);
	dynamics.changed(dynamicChanged);
	techniques.changed(techniqueChanged);
	execution.changed(executionChanged);

	//creates an input box along with a submit button, with all required callbacks
	inp = createInput("");
	inp.position(30, 420);
	submit = createButton('submit');
  	submit.position(inp.x + inp.width, inp.y);
	submit.mousePressed(SubmitCallback);
}

function draw() {
	background(0);
	//see listToStr func
	listToStr();
	fill(255);
	textSize(15);
	//writes all the possible combinations to the screen for the user to see
	text('Possible RH Fingering: ' + selectedFingeringStr, 10, 100);
	text('Possible Strokes: ' + selectedStrokesStr, 10, 130);
	text('Possible Dynamics: ' + selectedDynamicsStr, 10, 160);
	text('Possible Techniques: ' + selectedTechniquesStr, 10, 190);
	text('Possible Executions: ' + selectedExecutionStr, 10, 220);
	//writes the randomized data to the screen for the user to see
	text(`RH Fingering: ${randomisedTechniques[0]}\nStroke: ${randomisedTechniques[2]}\nDynamics: ${randomisedTechniques[1]}\nTechnique: ${randomisedTechniques[3]}\nExecution: ${randomisedTechniques[4]}`, 10, 290, 440, 440);
	text(`Add Element:`, 15, 400);
	//if the user is adding an element to the lists draw text will execute
	if (drawText){
		text(`Add ${technique} to:`, 275, 325, 450, 350);
	}
}

//all of these functions add options to the list of possible options if its not already there and removes it if it is there
function fingeringChanged(){
	if (!selectedFingerings.includes(fingering.value())) {
		selectedFingerings.push(fingering.value());
	} else if (selectedFingerings.includes(fingering.value())) {
		selectedFingerings.splice(selectedFingerings.indexOf(fingering.value()), 1);
	}
}

function strokeChanged(){
	if (!selectedStrokes.includes(strokes.value())) {
		selectedStrokes.push(strokes.value());
	} else if (selectedStrokes.includes(strokes.value())) {
		selectedStrokes.splice(selectedStrokes.indexOf(strokes.value()), 1);
	}
}

function dynamicChanged(){
	if (!selectedDynamics.includes(dynamics.value())) {
		selectedDynamics.push(dynamics.value());
	} else if (selectedDynamics.includes(dynamics.value())) {
		selectedDynamics.splice(selectedDynamics.indexOf(dynamics.value()), 1);
	}
}

function techniqueChanged(){
	if (!selectedTechniques.includes(techniques.value())) {
		selectedTechniques.push(techniques.value());
	} else if (selectedTechniques.includes(techniques.value())) {
		selectedTechniques.splice(selectedTechniques.indexOf(techniques.value()), 1);
	}
}

function executionChanged(){
	if (!selectedExecution.includes(execution.value())) {
		selectedExecution.push(execution.value());
	} else if (selectedExecution.includes(execution.value())) {
		selectedExecution.splice(selectedExecution.indexOf(execution.value()), 1);
	}
}

//this function turns all the elements of each list, into a plain string with normal readable llist formatting
function listToStr(){
	selectedFingeringStr = "";
	selectedStrokesStr = "";
	selectedTechniquesStr = "";
	selectedExecutionStr = "";
	selectedDynamicsStr = "";
	for (finger of selectedFingerings) {
		if (selectedFingerings.indexOf(finger) != selectedFingerings.length -1){
			selectedFingeringStr += finger + ", ";
		} else {
			selectedFingeringStr += finger;
		}
	}
	for (stk of selectedStrokes) {
		if (selectedStrokes.indexOf(stk) != selectedStrokes.length -1){
			selectedStrokesStr += stk + ", ";
		} else {
			selectedStrokesStr += stk;
		}
	}
	for (tech of selectedTechniques) {
		if (selectedTechniques.indexOf(tech) != selectedTechniques.length -1){
			selectedTechniquesStr += tech + ", ";
		} else {
			selectedTechniquesStr += tech;
		}
	}
	for (exe of selectedExecution) {
		if (selectedExecution.indexOf(exe) != selectedExecution.length -1){
			selectedExecutionStr += exe + ", ";
		} else {
			selectedExecutionStr += exe;
		}
	}
	for (dyn of selectedDynamics) {
		if (selectedDynamics.indexOf(dyn) != selectedDynamics.length -1) {
			selectedDynamicsStr += dyn + ", ";
		} else {
			selectedDynamicsStr += dyn;
		}
	}
}

function randomize(){ // Function to randomise a list of 5 techniques
	randomisedTechniques = ["", "", "", "", ""]; // creates a list of empty strings
	randomisedTechniques[0] = (selectedFingerings[Math.floor(random(selectedFingerings.length))]); // sets the first index of the randomised list to a random object in the list of fingerings.
	randomisedTechniques[1] = (selectedDynamics[Math.floor(random(selectedDynamics.length))]); // Same as above, but for dynamics
	randomisedTechniques[2] = (selectedStrokes[Math.floor(random(selectedStrokes.length))]); // you get the point
	randomisedTechniques[3] = (selectedTechniques[Math.floor(random(selectedTechniques.length))]); //
	randomisedTechniques[4] = (selectedExecution[Math.floor(random(selectedExecution.length))]); // 
	for (var i = 0; i < randomisedTechniques.length; i++) {
		if (typeof randomisedTechniques[i] == "undefined") {
			randomisedTechniques[i] = "Please Select A Possible Value";
		}
	}
}

function SubmitCallback(){ //Callback for the submit button
	technique = inp.value(); // set 'technique' to the value of the input field, inp.
	tech = createSelect(); // create a dropdown box for where to put it
	tech.option(""); // add an empty default option
	tech.option("RH Fingering"); // add all of the other options
	tech.option("Stroke");
	tech.option("Dynamics");
	tech.option("Technique");
	tech.option("Excution");
	//set the draw text to true to see the instructions
	drawText = true;
	tech.position(300, 350);
	//create a callback for the new drop down box
	tech.changed(techChanged);
	//clear the input box
	inp.value('');
}

//callback function for the temporary drop down box created in the previous func
function techChanged(){
	//check the value of the box and add the new otption to that list
	if (tech.value() === "RH Fingering") {
		possibleFingerings.push(technique);
	} else if (tech.value() === "Stroke") {
		possibleStrokes.push(technique);
	} else if (tech.value() === "Dynamics") {
		possibleDynamics.push(technique);
	} else if (tech.value() === "Technique") {
		possibleTechniques.push(technique);
	} else if (tech.value() === "Execution") {
		possibleExecution.push(technique);
	}
	//delete the text, remove the drop down box, and reupdate the lists
	drawText = false;
	tech.remove();
	updateLists();
}

function updateLists(){
	//remove all the dropdown boxes to avoid duplicates
	fingering.remove();
	strokes.remove();
	dynamics.remove();
	techniques.remove();
	execution.remove();

	//recreates all the drop downs
	fingering = createSelect(true);
	strokes = createSelect(true);
	dynamics = createSelect(true);
	techniques = createSelect(true);
	execution = createSelect(true);

	//reinitallizes all of the options with the new updated lists
	for (finger of possibleFingerings) {
		fingering.option(finger);
	}
	for (ske of possibleStrokes) {
		strokes.option(ske);
	}
	for (dynamic of possibleDynamics) {
		dynamics.option(dynamic);
	}
	for (technique of possibleTechniques) {
		techniques.option(technique);
	}
	for (exe of possibleExecution) {
		execution.option(exe);
	}

	//redeclare all the positions
	fingering.position(10, 10);
	strokes.position(55, 10);
	dynamics.position(140, 10);
	techniques.position(237, 10);
	execution.position(322, 10);

	//redeclare all the callbacks
	fingering.changed(fingeringChanged);
	strokes.changed(strokeChanged);
	dynamics.changed(dynamicChanged);
	techniques.changed(techniqueChanged);
	execution.changed(executionChanged);

}