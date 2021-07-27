
/*
 * klang 定制 blockly
 */

Blockly.Python.ORDER_COMMA = 18;           // ,


var MAJson = {
  "message0": "MA均线 (%1 , %2)",
  "args0": [

    {  
      "type": "field_dropdown",
      "name": "PRICE",
      "options": [
        [ "收盘价", "C" ],
        [ "开盘价", "O" ]
      ]
    },

    {"type": "input_value", "name": "DAY", "check": "Number"}
  ],
  "output": 'Number',
  "colour": 230
};

Blockly.Blocks['ma'] = {
  init: function() {
    this.jsonInit(MAJson);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return '计算均线 "%1".'.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  }
};

Blockly.Python['ma'] = function(block) {
  // Add to a variable in place.
  Blockly.Python.definitions_['from_klang_import_ma'] =
      'from Klang import MA';
  var argument0 = block.getFieldValue('PRICE')
  var  day = Blockly.Python.valueToCode(block,'DAY',
      Blockly.Python.ORDER_COMMA) || '0';

  //delete variables = None    
  delete Blockly.Python.definitions_['variables'];

  return ['MA (' +argument0 +','+ day +')\n',Blockly.Python.ORDER_FUNCTION_CALL]
};

