/**!
 *	Proc Name:		  GetRefiSources
 *	Lives In:		    StoneAge
 *  Schema Name:    FCCWeb
 *
 *	Author:			    Greg Lane
 *	Dependents:		  Finance.CAR.com website (FCCWeb)
 *	Last Modified:	09/21/2016
 **/
 

USE [StoneAge]
GO


if NOT exists (
  select * 
  from sys.procedures as p 
  left join sys.schemas as s on p.schema_id = s.schema_id 
  where s.Name = 'FCCWeb'
    and p.name = N'GetRefiSources' 
    and p.type in (N'P', N'PC')
)
exec('create proc FCCWeb.GetRefiSources as select GetDate();')
GO


alter proc FCCWeb.GetRefiSources
 as
begin
  set nocount on

  -- Dirty reads are OK
  set transaction isolation level read uncommitted


  select  
    fls.Source_Id as SourceId,
    ls.Active as Active,
    ls.Source_Name as SourceName
  from Finance_Lead_Source_Defaults as fls
  left join Lead_Sources as ls on ls.Source_Id = fls.Source_Id
  where fls.Type_Form_Id = 27 -- => "Refinance" type

end 
GO


/*
USE StoneAge
GO

  drop procedure FCCWeb.GetRefiSources
  
  exec FCCWeb.GetRefiSources

*/