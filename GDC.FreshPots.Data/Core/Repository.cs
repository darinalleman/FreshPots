using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;

namespace GDC.FreshPots.Data
{
    public class Repository<T> : IRepository<T>, IDisposable
    where T : class
    {
        protected DataContext _dataContext;


        #region Constructors

        public Repository()
        {
            _dataContext = DataContextFactory.GetSqlContext();
        }

        public Repository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        #endregion

        /// Return all instances of type T.
        
        public IEnumerable<T> All()
        {
            return GetTable;
        }

        public IEnumerable<T> FindSingle(Func<T, bool> exp)
        {
            return GetTable.Where<T>(exp);
        }

        /// Return all instances of type T that match the expression exp.
     
        public IEnumerable<T> FindAll(Func<T, bool> exp)
        {
            return GetTable.Where<T>(exp);
        }

        /// See IRepository.
    
        public T Single(Func<T, bool> exp)
        {
            return GetTable.Single(exp);
        }

        /// See IRepository.
        
        public T First(Func<T, bool> exp)
        {
            return GetTable.First(exp);
        }

        /// <summary>See IRepository.</summary>
        /// <param name="entity"></param>
        public virtual void Delete(List<T> entities)
        {
            foreach (var ent in entities)
            {
                GetTable.DeleteOnSubmit(ent);
                _dataContext.SubmitChanges();
            }
        }

        /// Create a new instance of type T.
       
        public virtual T CreateInstance()
        {
            T entity = Activator.CreateInstance<T>();
            GetTable.InsertOnSubmit(entity);
            return entity;
        }


        /// Inserts collection entities to their mapped table.

        public void SaveAll(List<T> entities)
        {
            foreach (var ent in entities)
            {
                GetTable.InsertOnSubmit(ent);
                _dataContext.SubmitChanges();
            }
        }


        /// Inserts single instance of entity to the mapped table.

        /// "ent" is the Entity to be inserted.
        public void Save(T ent)
        {
            GetTable.InsertOnSubmit(ent);
            _dataContext.SubmitChanges();
        }

        public void Save()
        {
            _dataContext.SubmitChanges();
        }




        #region Properties

        protected Table<T> GetTable
        {
            get { return _dataContext.GetTable<T>(); }
        }


        #endregion

        public void Dispose()
        {
            if (_dataContext != null)
                _dataContext.Dispose();
        }
    }
}
