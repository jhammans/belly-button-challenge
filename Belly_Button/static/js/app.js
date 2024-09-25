// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    // Filter the metadata for the object with the desired sample number
    let filteredMetadata = data.metadata.filter(obj => obj.id === sample);
    console.log("Filtered Metadata: ", filteredMetadata);

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");
    console.log("Panel: ", panel);

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    let fmd = filteredMetadata[0];
    console.log("fmd:", fmd);

     // Loop through each key pair of filteredMetadata dictionary and append to panel
     for (let key in fmd){
         panel.append("p").text(`${key}: ${fmd[key]}`)
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


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
buildMetadata(940);
buildCharts(940);
