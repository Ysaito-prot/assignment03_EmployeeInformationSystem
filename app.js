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
        if (this.keyword === "") {
          serchItems.push(item1);
        }
      }
      return this.items2 = serchItems;

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
