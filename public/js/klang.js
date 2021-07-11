
/*
 * klang 定制 blockly
 */


var mathChangeJson = {
  "message0": "MA %1 by %2",
  "args0": [
    {"type": "field_variable", "name": "VAR", "variable": "收盘价", "variableTypes": [""]},
    {"type": "input_value", "name": "DELTA", "check": "Number"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230
};

Blockly.Blocks['macd'] = {
  init: function() {
    this.jsonInit(mathChangeJson);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return '计算均线 "%1".'.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  }
};

Blockly.Python['macd'] = function(block) {
  // Add to a variable in place.
  Blockly.Python.definitions_['from_klang_import_ma'] =
      'from Klang import MA';
  var argument0 = Blockly.Python.valueToCode(block, 'DELTA',
      Blockly.Python.ORDER_ADDITIVE) || '0';
  var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.VARIABLE_CATEGORY_NAME);
  return varName + ' = (' + varName + ' if isinstance(' + varName +
      ', Number) else 0) + ' + argument0 + '\n';
};
