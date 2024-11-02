package com.cholnhial.taca.service;

import com.cholnhial.taca.service.dto.MessageToneRequestDTO;
import com.cholnhial.taca.service.dto.ToneResponseDTO;
import com.ibm.cloud.sdk.core.security.IamAuthenticator;
import com.ibm.watson.natural_language_understanding.v1.NaturalLanguageUnderstanding;
import com.ibm.watson.natural_language_understanding.v1.model.AnalysisResults;
import com.ibm.watson.natural_language_understanding.v1.model.AnalyzeOptions;
import com.ibm.watson.natural_language_understanding.v1.model.EmotionOptions;
import com.ibm.watson.natural_language_understanding.v1.model.Features;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class IBMToneAnalyzerService {

    private final NaturalLanguageUnderstanding toneAnalyzer;
    private final List<String> emotionTones;

    public IBMToneAnalyzerService() {
        IamAuthenticator.Builder authBuilder = new IamAuthenticator.Builder();
        /* It's a free API key use it responsibly */
        authBuilder.apikey("y3HM6k2u3S8shWhGodSjF23TO5WS8Jg5q9CR8vqSO00I");

        this.toneAnalyzer = new NaturalLanguageUnderstanding("2022-04-07", authBuilder.build());
        toneAnalyzer.setServiceUrl("https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/99df4023-4580-4d5a-ac1c-2e7bd7dd9f1a");
        emotionTones = List.of("anger", "fear", "joy", "sadness");
    }

    public String getMessageTone(String message) {
        EmotionOptions emotionOptions = new EmotionOptions.Builder()
                .build();

        Features features = new Features.Builder()
                .emotion(emotionOptions)
                .build();
     AnalyzeOptions.Builder  builder = new AnalyzeOptions.Builder();

        AnalysisResults analysis = toneAnalyzer.analyze(
                builder.text(message)
                        .features(features)
                        .build()
        ).execute().getResult();

        var emotions = analysis.getEmotion().getDocument().getEmotion();

        Map<String, Double> emotionScores = Map.of(
                "anger", emotions.getAnger(),
                "fear", emotions.getFear(),
                "joy", emotions.getJoy(),
                "sadness", emotions.getSadness()
        );

        return emotionScores.entrySet().stream()
                .filter(entry -> this.isEmotionalTone(entry.getKey()))
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse("unknown");
    }

    private boolean isEmotionalTone(String tone) {
        return emotionTones.contains(tone);
    }

    public ToneResponseDTO processMessage(MessageToneRequestDTO request) {
        return new ToneResponseDTO(getMessageTone(request.getMessage()));
    }
}
