/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('territories', {
    territory_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    territory_description: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'region',
        key: 'region_id'
      }
    }
  }, {
    tableName: 'territories'
  });
};
