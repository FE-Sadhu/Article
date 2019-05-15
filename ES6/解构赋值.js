{
  let metaData = {
    title: 'abc1',
    test: [{
      title: 'abc2',
      desc: 'description'
    }]
  }

  let {title: value1, test: [{title: value2}]} = metaData;
  console.log(value1, value2);
  // let {title, test: [{desc}]} = metaData; // abc1 description 但是要取第二个title的话得要上面那种方法
  // console.log(title, desc);
}