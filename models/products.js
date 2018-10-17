/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'suppliers',
        key: 'supplier_id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'category_id'
      }
    },
    quantity_per_unit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unit_price: {
      type: DataTypes.REAL,
      allowNull: true
    },
    units_in_stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    units_on_order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reorder_level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    discontinued: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    object_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4')
    }
  }, {
    tableName: 'products'
  });
};
