function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var metaURL = "/metadata/" + sample;
  // Use `d3.json` to fetch the metadata for a sample
  
  // Use d3 to select the panel with id of `#sample-metadata`
  var panel = d3.select('#sample-metadata');
  // Use `.html("") to clear any existing metadata
  panel.html("");

  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
  d3.json(metaURL).then(function(data){
    Object.entries(data).forEach(([key, value]) =>{
      panel.append("h5").text(`${key}: ${value}`);
    });
  })
}
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildCharts(sample) {
  var sampleURL = "/samples/" + sample
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(sampleURL).then(function(data){
    
    console.log(sampleData);
    // @TODO: Build a Bubble Chart using the sample data
    var bubbleTrace = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: 'markers',
      marker: {
        size: sampleData.sample_values 
      } 
    };

    var bubbleData = [bubbleTrace];

    var bubbleChartLayout = {
      showlegend: false,
      height: 500,
      width: 600
    };
    Plotly.plot("bubble", bubbleData, bubbleChartLayout);

    var samplePieData = sampleData.slice(0,10)
    console.log(samplePieData);

    var pieTrace = [{
      values: samplePieData.sample_values,
      labels: samplePieData.otu_ids,
      text: samplePieData.otu_labels,
      type: "pie"
    }];

    var layout = {
      height:500,
      width: 500
    };

    Plotly.plot("pie", pieTrace, layout);

  });
    
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
