/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer_customer_demo', {
    customer_id: {
      type: DataTypes.CHAR,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customers',
        key: 'customer_id'
      }
    },
    customer_type_id: {
      type: DataTypes.CHAR,
      allowNull: false,
      references: {
        model: 'customer_demographics',
        key: 'customer_type_id'
      }
    }
  }, {
    tableName: 'customer_customer_demo'
  });
};
