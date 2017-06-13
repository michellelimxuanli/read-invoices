//creating the array of objects:
var array = [];

//reading the data
var request = new XMLHttpRequest();
request.open("GET", "SAMPLE.XML", false);
request.send();
var xml = request.responseXML;
var customer = xml.getElementsByTagName("RazaoSocial")[0].childNodes[0].nodeValue;
var date = xml.getElementsByTagName("DataEmissao")[0].childNodes[0].nodeValue;
var grossvalue = xml.getElementsByTagName("BaseCalculo")[0].childNodes[0].nodeValue;
array.push({
	customer: customer,
	date: date,
	grossvalue: grossvalue
});

downloadCSV(array);

//convert Array of Objects to CSV
function convertArrayOfObjectsToCSV(array) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        columnDelimiter = ',';
        lineDelimiter = '\n';

        keys = Object.keys(array[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }
//download the CSV 
 function downloadCSV(array) {  
        var data, filename, link;
        var csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        filename = 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }