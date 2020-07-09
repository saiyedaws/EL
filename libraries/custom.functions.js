function insensitiveReplaceAll(original, find, replace) {
    var str = "",
      remainder = original,
      lowFind = find.toLowerCase(),
      idx;
  
    while ((idx = remainder.toLowerCase().indexOf(lowFind)) !== -1) {
      str += remainder.substr(0, idx) + replace;
  
      remainder = remainder.substr(idx + find.length);
    }
  
    return str + remainder;
  }
  
