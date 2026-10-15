fetch("works.csv")
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {

        // CSVを行ごとに分割
        var rows = data.trim().split("\n");

        // 1行目は見出し
        var headers = rows[0].split(",");

        // 2行目以降を作品データにする
        var works = rows.slice(1).map(function(row) {

            var values = row.split(",");

            var work = {};

            headers.forEach(function(header, index) {
                work[header] = values[index];
            });

            return work;
        });


        // Workを表示する場所
        var grid = document.getElementById("works-grid");

        
         // 作品を1つずつ表示
        works.forEach(function(work) {

            var card = document.createElement("article");

            card.className = "work-card";

            card.innerHTML =
                '<a href="' + work.link + '">' +
                    '<img src="' + work.image + '" alt="' + work.title + '">' +
                    '<h4>' + work.title + '</h4>' +
                    '<p>' + work.description + '</p>' +
                '</a>';

            grid.appendChild(card);
        });        

        var categorySelect = document.getElementById("category");
        var sortSelect = document.getElementById("sort");


        // カテゴリ一覧を作る
        var categories = [];

        works.forEach(function(work) {

            // まだ追加されていないカテゴリならリストに追加
            if (!categories.includes(work.category)) {
                categories.push(work.category);
            }

        });


        // selectにカテゴリを追加しWebページに表示させる
        categories.forEach(function(category) {

            var option = document.createElement("option");option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });


        // 作品を表示する関数
        function displayWorks() {

            // 選択されたカテゴリを取得
            var selectedCategory = categorySelect.value;

            // 選択されたソートを取得
            var sortType = sortSelect.value;

            // 元のworksをコピー
            var filteredWorks = works.slice();


            // カテゴリを絞り込み
            if (selectedCategory !== "all") {

                filteredWorks = filteredWorks.filter(function(work) {

                    return work.category === selectedCategory;

                });

            }


            // ソート
            if (sortType === "new") {

                filteredWorks.sort(function(a, b) {
                    return Number(b.year) - Number(a.year);
                });

            }

            else if (sortType === "old") {

                filteredWorks.sort(function(a, b) {
                    return Number(a.year) - Number(b.year);
                });

            }

            else if (sortType === "title") {

                filteredWorks.sort(function(a, b) {
                    return a.title.localeCompare(b.title, "ja");
                });

            }


            // 画面を1度空にする
            grid.innerHTML = "";{


            };

        }

        // 最初に作品を表示
        displayWorks();


        // カテゴリが変更時
        categorySelect.addEventListener("change", function(){
               displayWorks();
        });


        // ソートが変更時
        sortSelect.addEventListener("change", function(){
            displayworks();
        });
    });

    var latitude=35.6895;
    var longitude=139.6917;

    var weatherUrl=
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=" + latitude +
    "&longitude=" + longitude +
    "&current=temperature_2m,weather_code" +
    "&timezone=Asia%2FTokyo";

    fetch(weatherUrl)
         .then(function(response){
             return response.json();
         })
         .then(function(data) {
            var weatherCode=data.current.weather_code;
            showWeather(weatherCode);
        })
    
   function showWeather(code) {

        var icon = document.getElementById("weather-icon");

        if (code === 0) {
            icon.textContent = "☀";
            document.body.className = "weather-sunny";

        } else if (code >= 1 && code <= 3) {
            icon.textContent = "☁";
            document.body.className = "weather-cloudy";

        } else if (code >= 51 && code <= 67) {
            icon.textContent = "☂";
            document.body.className = "weather-rainy";

        } else {
            icon.textContent = "☁";
            document.body.className = "weather-cloudy";
        }
    }