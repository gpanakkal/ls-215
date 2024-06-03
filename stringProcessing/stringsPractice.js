
{
  // 1
  const firstName = 'Gautam';
  const lastName = 'Panakkal';
  const fullName = firstName + ' ' + lastName;
  console.log(fullName);
  // 2
  console.log(firstName.concat(' ', lastName));
  // 3
  console.log(fullName.split(' '));
}
{
  // 4
  const language = 'JavaScript';
  const idx = language.indexOf('S');
  console.log({idx});
  // 5
  const charCode = language.charCodeAt(idx);
  console.log({charCode});
  // 6
  console.log({fromCharCode: String.fromCharCode(charCode)});
  // 7
  console.log({'last-a': language.lastIndexOf('a')})
  // 8
  let a = 'a', b = 'b';
  console.log({ a, b, greaterThan: a > b })
  b = 'B';
  console.log({ a, b, greaterThan: a > b })

  // 9
  const firstSlice = language.slice(1, 4);
  const secondSlice = language.slice(2, 4);
  console.log({ firstSlice, secondSlice });
  // 10
  const firstSubstr = language.substring(1, 4);
  const secondSubstr = language.substring(2, 4);
  console.log({ firstSubstr, secondSubstr });
  // 11
  const fromEndSlice1 = language.slice(1, -1);
  const fromEndSlice2 = language.slice(2, -1);
  console.log({ fromEndSlice1, fromEndSlice2 });
  // 12
  const fromEndSubstr1 = language.substring(1, -1);
  const fromEndSubstr2 = language.substring(2, -1);
  console.log({ fromEndSubstr1, fromEndSubstr2 });
}
{
  // 13
  const fact1 = 'JavaScript is fun';
  const fact2 = 'Kids like it too';
  const compoundSentence = `${fact1} and ${fact2.toLowerCase()}`;
  console.log({compoundSentence});
  // 14
  console.log(fact1[0], fact2[0]);

  // 15
  const pi = 22 / 7;
  console.log({last14: pi.toString().lastIndexOf('14')});

  // 16
  const boxNumber = 356..toString();
  console.log({ boxNumber })
  // 17
  const boxNum = parseInt(boxNumber);
  console.log(typeof boxNum);
  const boxNumString = String(boxNum);
  console.log(typeof boxNumString);

  // 18
  const greet = (name) => {
    const greeting = `Hello ${name}.`;
    if (name.endsWith('!')) {
      console.log(`${greeting.toUpperCase()} WHY ARE WE SCREAMING?`);
    } else {
      console.log(greeting);
    }
  }
}