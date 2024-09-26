// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    // Filter the metadata for the object with the desired sample number
    let filteredMetadata = data.metadata.filter(obj => obj.id === sample);
    console.log("Filtered Metadata: ", filteredMetadata);

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");
    // console.log("Panel: ", panel);

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    let fmd = filteredMetadata[0];
    console.log("fmd:", fmd);

     // Loop through each key pair of filteredMetadata dictionary and append to panel
     for (let key in fmd){
         panel.append("p").text(`${key.toUpperCase()}: ${fmd[key]}`)
        //  console.log("Key: ", key, "Value: ", fmd[key]);
     }
  })
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    // Filter the samples for the object with the desired sample number
    // The id column in the samples field is stored as string so the input variable 
    // has to be converted to a string in the filter comparison
    let filteredSamples = data.samples.filter(obj => obj.id === sample.toString());
    console.log("Filtered Samples: ", filteredSamples);

    // Get the otu_ids, otu_labels, and sample_values
    let fs = filteredSamples[0];
    console.log("fs:", fs);

    let sampleOtuIds = fs.otu_ids;
    let sampleOtuLabels = fs.otu_labels;
    let sampleValues = fs.sample_values;

    console.log("otu_ids", sampleOtuIds);
    console.log("otu_labels", sampleOtuLabels);
    console.log("sample_values", sampleValues);

    // Build a Bubble Chart
    let bubbleTrace = {
        x: sampleOtuIds,
        y: sampleValues,
        text: sampleOtuLabels,
        mode: 'markers',
        marker: {
          color: sampleOtuIds,
        //   opacity: [1, 0.8, 0.6, 0.4],
          size: sampleValues
        }
      };
      
      let bubbleData = [bubbleTrace];
      
      let bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        xaxis: { title: 'OTU ID' },  // X-axis label
        yaxis: { title: 'Number of Bacteria' },  // Y-axis label
        showlegend: false,
        height: 800,
        width: 1000
      };
    
    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
   

    // Create an array of objects that combines otu_ids, otu_labels, and sample_values
    let sampleData = fs.otu_ids.map((otu_id, index) => ({
        otu_id: otu_id,
        otu_label: fs.otu_labels[index],
        sample_value: fs.sample_values[index]
    }));

     // Don't forget to slice and reverse the input data appropriately
    let sortedBysampleValues = sampleData.sort((a, b) => b.sample_values - a.sample_values);
    let slicedData = sortedBysampleValues.slice(0, 10);
    slicedData.reverse();
    console.log("Bar Data Sliced", slicedData);


    let barTrace = {
        x: slicedData.map(d => d.sample_value),
        y: slicedData.map(d => `OTU ${d.otu_id}`),
        text: slicedData.map(d => d.otu_label),
        orientation: 'h',
        type: 'bar'
    };

    let barData = [barTrace];

    let barLayout = {
        title: 'Top 10 Bacteria Cultures Found',
        xaxis: { title: 'Number of Bacteria' },  // Y-axis label
    };


    // Render the Bar Chart
    Plotly.newPlot('bar', barData, barLayout);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let subjectIds = data.names;
    console.log("Subject IDS ", subjectIds);


    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");
    // console.log("Dropdown Menu", dropdownMenu);


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < subjectIds.length; i++) {
        let subjectId = subjectIds[i];
        dropdownMenu.append("option").text(subjectId).attr("value", subjectId);
        // console.log("Option:",subjectId);
    };

    // Get the first sample from the list
    let firstSample = subjectIds[0];
    console.log("First Sample", firstSample); 


    // Build charts and metadata panel with the first sample
    buildMetadata(parseInt(firstSample));
    buildCharts(firstSample);

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(parseInt(newSample));
  buildCharts(newSample);

}

// Initialize the dashboard
init();