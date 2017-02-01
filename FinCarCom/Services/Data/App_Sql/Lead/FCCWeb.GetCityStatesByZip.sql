/**!
 *	Proc Name:		  GetCityStatesByZip
 *	Lives In:		    StoneAge
 *  Schema Name:    FCCWeb
 *
 *	Author:			    Greg Lane
 *	Dependents:		  Finance.CAR.com website (FCCWeb)
 *	Last Modified:	03/28/2016
 **/
 

USE [StoneAge]
GO


if NOT exists (
  select * 
  from sys.procedures as p 
  left join sys.schemas as s on p.schema_id = s.schema_id 
  where s.Name = 'FCCWeb'
    and p.name = N'GetCityStatesByZip' 
    and p.type in (N'P', N'PC')
)
exec('create proc FCCWeb.GetCityStatesByZip as select GetDate();')
GO


alter proc FCCWeb.GetCityStatesByZip (
  @Zipcode char(5) = '99999'
) as
begin
  set nocount on

  -- Dirty reads are OK
  set transaction isolation level read uncommitted


  select
    City,
    [State],
    Zip
  from Zips
  where Zip = @Zipcode
    and Active = 1
    and Country_Id = 1
    and Zip != '99999'

end 
GO


/*
USE StoneAge
GO

  drop procedure FCCWeb.GetCityStateByZip
  
  exec FCCWeb.GetCityStatesByZip @Zipcode='37064'  -- => true

  exec FCCWeb.GetCityStatesByZip @Zipcode='99999'  -- => false

*/