# Bootstrap Table Row Accordion

This plugin adds accordion between rows inside a table loading external data via AJAX.
It is useful when you want to toggle between hiding and showing more information about a row content.
It requires Bootstrap, jQuery and Font Awesome.

![screenshot](http://blog.andreaventuri.it/wp-content/uploads/2018/06/screenshot.png)

## Basic Example

```javascript
$('table').tableAccordion({
  url: 'data.json' // returns a JSON matrix
});
```

## Full Example

```javascript
$('table').tableAccordion({
  url: 'data.json', // returns a JSON matrix
  id: '.td_id', // selector of the cell containing the value to pass as param to the page indicated in "url"
  tbl_class: 'innerTable', // class to set in the generated table
  cache: false, // when cache is enabled will be performed only one call for each row
  success:  function(elem){ // callback executed after the table is created and filled with data
    alert('Success!');
    console.log(elem);
  }
});
```

## Requirements
- Bootstrap >= 4
- jQuery >= 1.10
- Font Awesome >= 5