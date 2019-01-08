namespace Data.Common.UnitOfWork
{
    using System;
    using System.Data.Entity;
    using System.Threading.Tasks;

    public interface IUnitOfWork : IDisposable
    {
        IDbSet<T> Set<T>() where T : class;
        void Commit();
    }
}
