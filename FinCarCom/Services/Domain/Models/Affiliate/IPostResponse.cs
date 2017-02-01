using System;

namespace FinCarCom.Services.Domain.Models.Affiliate
{
  public interface IPostResponse
  {
    int OutboundSourceId { get; }

    int InboundSourceId { get; }

    string PingType { get; }

    bool IsSuccess { get; }

    string ResponseId { get; }

    string Message { get; }

    double Duration { get; }

    string RawRequest { get; }

    string RawResponse { get; }

    string RejectedReason { get; }

    DateTime PingStartTime { get; }

    string ScoreType { get; }

    decimal MinimumIncomeAmount { get; }

    decimal MaximumIncomeAmount { get; }
  }
}