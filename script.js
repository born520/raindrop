function start() {
  gapi.client.init({
    'apiKey': 'AIzaSyBxoKywvkwR7h6YrZK4OeICatDhOoJm6wc', // 여기에 실제 API 키 입력
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    loadSheetData();
  });
}

function loadSheetData() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1sZIgno8fWo375Z-AQRNnATG1zrRZDC_EPsOTDgq2GYU', // 여기에 스프레드시트 ID 입력
    range: 'Sheet1!A:E', // 스프레드시트의 적절한 범위 입력
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      var output = document.getElementById('output');
      output.innerHTML = '<ul>';
      for (i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        // 각 행의 데이터를 리스트 아이템으로 추가
        output.innerHTML += `<li>${row[0]}, ${row[1]}, ${row[2]}, <img src="${row[3]}" alt="Image" style="width:100px;">, ${row[4]}</li>`;
      }
      output.innerHTML += '</ul>';
    } else {
      output.innerHTML = 'No data found.';
    }
  }, function(response) {
    output.innerHTML = 'Error: ' + response.result.error.message;
  });
}

// API 로드 후 start 함수 호출
function handleClientLoad() {
  gapi.load('client', start);
}

document.addEventListener('DOMContentLoaded', handleClientLoad);
