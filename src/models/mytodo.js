const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class mytodo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  mytodo.findAll = async () => {
    const allTodos = await sequelize.query('SELECT * FROM  mytodos;');
    return allTodos;
  };

  mytodo.init({
    title: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'mytodo',
  });
  return mytodo;
};
