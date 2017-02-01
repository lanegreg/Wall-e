/**!
 *	Proc Name:		GetPvcCacheData
 *	Lives In:		VehicleContent
 *  Schema Name:    FCCWeb
 *
 *	Author:			Greg Lane
 *	Dependents:		Finance.CAR.com website (FCCWeb)
 *	Last Modified:	09/29/2016
 **/
 

USE [VehicleContent]
GO


if NOT exists (
  select * 
  from sys.procedures as p 
  left join sys.schemas as s on p.schema_id = s.schema_id 
  where s.Name = 'FCCWeb'
    and p.name = N'GetPvcCacheData' 
    and p.type in (N'P', N'PC')
)
exec('create proc FCCWeb.GetPvcCacheData as select GetDate();')
GO


alter proc FCCWeb.GetPvcCacheData as
begin
  set nocount on

  -- Dirty reads are OK
  set transaction isolation level read uncommitted


declare @CarDotComProductId int = 1

  -- Cache Makes for reuse
  declare @Makes table (
    Id int, 
    Name varchar(50), 
    PluralName varchar(50), 
    SeoName varchar(50), 
    IsActive bit
  )

  insert @Makes
  select
    pma.MakeId as [Id],
	  pma.Name,
	  pma.PluralName,
	  pma.SeoName,
    case  
      when dm.MakeId is null
      then 1
      else 0
    end as [IsActive]
	from Pvc.Make as pma
  left join pvc.DeactivatedMakes as dm
    on pma.MakeId = dm.MakeId 
      and dm.ProductId = @CarDotComProductId

  /**
   * Return the Make recordset
   * 
   * First Recordset Contract:
   *    { Id, Name, PluralName, SeoName, IsActive }
   *
   **/
	select *
  from @Makes

  /**
   * Return the Models recordset
   *
   * Second Recordset Contract:
   *    { Id, Name, SeoName, MakeId }
   *
   **/
  select 
    mo.ModelId as [Id],
    mo.Name, 
    mo.SeoName,
    mo.MakeId
  from Pvc.Model as mo
  inner join @Makes as ma
    on mo.MakeId = ma.Id
  order by mo.MakeId, mo.Name

end 
GO


/*
USE VehicleContent
GO

  drop procedure FCCWeb.GetPvcCacheData
  
  exec FCCWeb.GetPvcCacheData 

*/