/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('region', {
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    region_description: {
      type: DataTypes.CHAR,
      allowNull: false
    }
  }, {
    tableName: 'region'
  });
};
