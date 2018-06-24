function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join("/");
  const t2 = [hour, minute, second].map(formatNumber).join(":");

  return `${t1} ${t2}`;
}

function objStyle(style) {
  let str = [];
  Object.keys(style).forEach(key => {
    str.push(`${key}:${style[key]};`);
  });
  return str.join(";");
}

function keyBy(obj, type) {
  const newObj = {};
  for (const [i, v] of obj.entries()) {
    newObj[v.type] = navList[i];
  }
  return newObj;
}

function pick(obj, arr) {
  const newObj = {};
  for (const k in obj) {
    if (arr.includes(k)) {
      newObj[k] = obj[k];
    }
  }
  return newObj;
}

const navList = [
  {
    title: "全部",
    type: "all"
  },
  {
    title: "精华",
    type: "good"
  },
  {
    title: "分享",
    type: "share"
  },
  {
    title: "问答",
    type: "ask"
  },
  {
    title: "招聘",
    type: "job"
  },
  {
    title: "测试",
    type: "dev"
  }
];

export { formatNumber, formatTime, objStyle, navList, keyBy, pick };
