Vue.createApp({
  data: function () {
    return {
      // 社員リスト
      items: [],
      sort_key: "",
      sort_asc: true,
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
  },
  computed: {
    sort_items() {
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
            return a[this.sort_key].localeCompare(b[this.sort_key], 'ja');
          });
        }
        if (this.sort_asc === false) {
          this.items.sort((a, b) => {
            return b[this.sort_key].localeCompare(a[this.sort_key], 'ja');
          });
        }
        return this.items;
      } else {
        return this.items;
      }
    },
  },
}).mount("#app");
