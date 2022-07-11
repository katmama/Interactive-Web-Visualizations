var option = "";
var dataSet ;


function init() {
const bellyData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

  d3.json(bellyData).then(function(data){
    dataSet = data;

    console.log(dataSet);
    
    

    var optionMenu = d3.select("#selDataset");

    data.names.forEach(function(name){
      optionMenu.append("option").text(name);
    });
    optionMenu.property("selectid", "940");
    option = optionMenu.node().value;

    displayMetaData(option);
    displayHBarChart(option,dataSet);
    displayBubbleChart(option,dataSet);
 })
}
init();
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }


function optionChanged(value) {
    option = value;
    displayMetaData(option);
    displayHBarChart(option,dataSet);
    displayBubbleChart(option,dataSet);
}

function displayMetaData(id) {
   var selectedData = "";
   
   for (var i = 0; i < dataSet['metadata'].length; i++) {
    
        if (dataSet['metadata'][i]['id'] == id){
            selectedData = dataSet['metadata'][i];
            break;
        }
    }

    var table = "<div><h4>id: "+selectedData['id']+"</h4></div>"
    table+= "<div><h4>ethnicity: "+selectedData['ethnicity']+"</h4></div>"
    table+= "<div><h4>gender: "+selectedData['gender']+"</h4></div>"
    table+= "<div><h4>age: "+selectedData['age']+"</h4></div>"
    table+= "<div><h4>location: "+selectedData['location']+"</h4></div>"
    table+= "<div><h4>bbtype: "+selectedData['bbtype']+"</h4></div>"
    table+= "<div><h4>wfreq: "+selectedData['wfreq']+"</h4></div>"
    
    
    console.log(selectedData);
   
   d3.select("#sample-metadata").html(table);
        
}


function displayHBarChart(option,dataSet) {
    
    var barData = dataSet.samples.filter(sample => sample.id == option);
    console.log(barData);
    

    var y = barData.map(row =>row.otu_ids);  
    var y1 =[];

    
    for(i=0;i<y[0].length;i++){
        y1.push(`OTU ${y[0][i]}`);
    }

    var x = barData.map(row =>(row.sample_values));
    var text = barData.map(row =>row.otu_labels);
    

    var trace = {
        x:x[0].slice(0,10),
        y:y1.slice(0,10),
        text:text[0].slice(0,10),
        type:"bar",
        orientation:"h",
        
    };

    var data = [trace];

    var layout = {
        yaxis: {
            autorange: "reversed" 
        }
    }

    

    
    Plotly.newPlot("bar",data,layout);
}

function displayBubbleChart(option,dataSet) {

    var barData = dataSet.samples.filter(sample => sample.id == option);
    console.log(barData); 

    var x = barData.map(row =>row.otu_ids); 
    var y = barData.map(row =>row.sample_values); 
    var text = barData.map(row =>row.otu_labels);
    var marker_size = barData.map(row =>row.sample_values);
    var marker_color = barData.map(row =>row.otu_ids);
    
    console.log(x[0]);
    console.log(y[0]);
    console.log(text);
    
    var trace1 = {
        x:x[0],
        y:y[0],
        text: text[0],
        mode:"markers",
        marker: {
            color: marker_color[0],
            size: marker_size[0],
            colorscale: "Earth"
        }
        
    };

    var data = [trace1];

    var layout = {
        xaxis:{
            title: "OTU ID"
        }

    };

    Plotly.newPlot("bubble",data,layout);

}




