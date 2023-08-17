Vue.createApp({
  data: function () {
    return {
      // 社員リスト
      items: [],
      items2: [],
      sort_key: "",
      sort_asc: true,
      keyword: "",
      Order: "",
      additems: [
        {
          id: '', 
          name: '', 
          company: '', 
          division: '', 
          title: ''
        }
      ],
      message1:'',
      message2:'',
      message3:'',
      message4:''
    };
  },
  // ライフサイクルハック
  created: async function () {
    const res = await fetch("cards.json");
    const users = await res.json();
    this.items = users;
  },
  methods: {
    sortBy(key) {
      this.sort_key === key
        ? (this.sort_asc = !this.sort_asc)
        : (this.sort_asc = true);
      this.sort_key = key;
    },
    //検索実行
    isSearch: function () {
      // 絞り込み前の表を削除
      document.getElementById('test1').style.display = 'none'
      
      var serchItems = [];

      for (var i in this.items) {
        var item1 = this.items[i];

        if (String(item1.id).indexOf(this.keyword) !== -1 && this.Order == "id") {
          serchItems.push(item1);
        }
        if (item1.name.indexOf(this.keyword) !== -1 && this.Order == "name") {
          serchItems.push(item1);
        }
        if (item1.company.indexOf(this.keyword) !== -1 && this.Order == "company") {
          serchItems.push(item1);
        }
        if (item1.division.indexOf(this.keyword) !== -1 && this.Order == "division") {
          serchItems.push(item1);
        }
        if (item1.title.indexOf(this.keyword) !== -1 && this.Order == "title") {
          serchItems.push(item1);
        }
        // if (this.keyword === "") {
        //   serchItems.push(item1);
        // }
      }
      return this.items2 = serchItems;

    },
    add: function () {
      // バリデーションチェック
      // 会社名のバリデーションチェック
      const company2 = /株式会社/;
      if (company2.test(this.additems.company) === false) {
        this.message2 = "会社名：「株式会社」を入れて入力してください";
      } else {
        this.message2 = "";
      }
      // 名前のバリデーションチェック
      const reg = new RegExp(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/);
            //指定した組み合わせになっていなかった場合判定を返す。
      if (reg.test(this.additems.name) === false) {
        this.message1 = "名前：日本語で入力してください";
      } else {
        this.message1 = "";
      }
      // 部署名のバリデーションチェック
      const division2 = /部/;
      if (division2.test(this.additems.division) === false) {
        this.message3 = "部署：「○○部」の形で入力してください";
      } else {
        this.message3 = "";
      }
      // 役職のバリデーションチェック
      if (this.additems.title !== "主任" && this.additems.title !== "部長" && this.additems.title !== "課長" && this.additems.title !== "係長" && this.additems.title !== ""){
        this.message4 = "役職：「主任」「部長」「課長」「係長」のいずれかを入力してください(未入力可)";
      } else {
        this.message4 = "";
      }



      if (this.message1 === "" && this.message2 === "" && this.message3 === "" && this.message4 === "") {
        // バリデーションチェックをクリアしたら下実行
      this.items.push({
          "id": this.items[this.items.length - 1].id + 1,
          "name": this.additems.name,
          "company": this.additems.company,
          "division": this.additems.division,
          "title": this.additems.title
        });
        // 追加ボタン押下後入力フォームリセット
        this.additems.name = "";
        this.additems.company = "";
        this.additems.division = "";
        this.additems.title = "";
        this.message = "";
      }
  },
  },
  computed: {
    sort_items() {
      // 絞り込み前の表
      // IDの並び替え
      if (this.sort_key != "" && this.sort_key === "id") {
        let set = 1;
        this.sort_asc ? (set = 1) : (set = -1);
        this.items.sort((a, b) => {
          if (a[this.sort_key] < b[this.sort_key]) return -1 * set;
          if (a[this.sort_key] > b[this.sort_key]) return 1 * set;
          return 0;
        });
        return this.items;
      } else if (this.sort_key != "" && this.sort_key != "id") {
        // ID以外の並び替え（日本語）
        if (this.sort_asc === true) {
          this.items.sort((a, b) => {
            return a[this.sort_key].localeCompare(b[this.sort_key], "ja");
          });
        }
        if (this.sort_asc === false) {
          this.items.sort((a, b) => {
            return b[this.sort_key].localeCompare(a[this.sort_key], "ja");
          });
        }
        return this.items;
      } else {
        return this.items;
      }
    },
    sort_items2() {
      // 絞り込み後の表
      // IDの並び替え
      if (this.sort_key != "" && this.sort_key === "id") {
        let set = 1;
        this.sort_asc ? (set = 1) : (set = -1);
        this.items2.sort((a, b) => {
          if (a[this.sort_key] < b[this.sort_key]) return -1 * set;
          if (a[this.sort_key] > b[this.sort_key]) return 1 * set;
          return 0;
        });
        return this.items2;
      } else if (this.sort_key != "" && this.sort_key != "id") {
        // ID以外の並び替え（日本語）
        if (this.sort_asc === true) {
          this.items2.sort((a, b) => {
            return a[this.sort_key].localeCompare(b[this.sort_key], "ja");
          });
        }
        if (this.sort_asc === false) {
          this.items2.sort((a, b) => {
            return b[this.sort_key].localeCompare(a[this.sort_key], "ja");
          });
        }
        return this.items2;
      } else {
        return this.items2;
      }
    },
  },
}).mount("#app");
