/**!
 *	Proc Name:		  VerifyZipcode
 *	Lives In:		    StoneAge
 *  Schema Name:    FCCWeb
 *
 *	Author:			    Greg Lane
 *	Dependents:		  Finance.CAR.com website (FCCWeb)
 *	Last Modified:	03/01/2016
 **/
 

USE [StoneAge]
GO


if NOT exists (
  select * 
  from sys.procedures as p 
  left join sys.schemas as s on p.schema_id = s.schema_id 
  where s.Name = 'FCCWeb'
    and p.name = N'VerifyZipcode' 
    and p.type in (N'P', N'PC')
)
exec('create proc FCCWeb.VerifyZipcode as select GetDate();')
GO


alter proc FCCWeb.VerifyZipcode (
  @Zipcode char(5) = '99999',
  @ReturnVal bit output
) as
begin
  set nocount on

  -- Dirty reads are OK
  set transaction isolation level read uncommitted


  select top 1 @ReturnVal = count(Zip)
  from Zips
  where Zip = @Zipcode
    and Active = 1
    and Zip != '99999'

end 
GO


/*
USE StoneAge
GO

  drop procedure FCCWeb.VerifyZipcode
  
  exec FCCWeb.VerifyZipcode @Zipcode='92627'  -- => true

  exec FCCWeb.VerifyZipcode @Zipcode='11310'  -- => false

*/