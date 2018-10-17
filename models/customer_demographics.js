/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer_demographics', {
    customer_type_id: {
      type: DataTypes.CHAR,
      allowNull: false,
      primaryKey: true
    },
    customer_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'customer_demographics'
  });
};
